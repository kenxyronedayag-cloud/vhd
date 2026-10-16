<?php

namespace App\Http\Controllers;

use App\Models\SupportRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SupportMessageController extends Controller
{
    public function index(Request $request, SupportRequest $supportRequest): Response
    {
        $user = $request->user();

        abort_unless(
            $user->role === 'client'
                ? $supportRequest->user_id === $user->id
                : in_array($user->role, ['agent', 'main_admin'], true),
            403
        );

        $supportRequest->load([
            'messages.user:id,name,role',
        ]);

        return Inertia::render('support-requests/chat', [
            'supportRequest' => [
                'id' => $supportRequest->id,
                'reference' => 'VH-' . str_pad((string) $supportRequest->id, 3, '0', STR_PAD_LEFT),
                'subject' => $supportRequest->subject,
                'category' => $supportRequest->category,
                'status' => $supportRequest->status,
            ],
            'messages' => $supportRequest->messages->map(fn ($message) => [
                'id' => $message->id,
                'message' => $message->message,
                'sender_id' => $message->user_id,
                'sender_name' => $message->user->name,
                'sender_role' => $message->user->role,
                'created_at' => $message->created_at->format('M d, Y g:i A'),
            ]),
            'currentUserId' => $user->id,
        ]);
    }

    public function store(Request $request, SupportRequest $supportRequest): RedirectResponse
    {
        $user = $request->user();

        abort_unless(
            $user->role === 'client'
                ? $supportRequest->user_id === $user->id
                : in_array($user->role, ['agent', 'main_admin'], true),
            403
        );

        $validated = $request->validate([
            'message' => ['required', 'string', 'max:5000'],
        ]);

        $supportRequest->messages()->create([
            'user_id' => $user->id,
            'message' => $validated['message'],
        ]);

        return redirect()->route('support-requests.chat', $supportRequest);
    }
}
