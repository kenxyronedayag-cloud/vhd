
<?php

use App\Http\Controllers\SupportMessageController;
use App\Http\Controllers\SupportRequestController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function (Request $request) {
        return match ($request->user()->role) {
            'agent' => redirect()->route('agent.dashboard'),
            'main_admin' => redirect()->route('main-admin.dashboard'),
            default => redirect()->route('client.dashboard'),
        };
    })->name('dashboard');

    Route::get('/support-requests/create', function (Request $request) {
        abort_unless($request->user()->role === 'client', 403);

        return Inertia::render('support-requests/create');
    })->name('support-requests.create');

    Route::post('/support-requests', [SupportRequestController::class, 'store'])
        ->name('support-requests.store');

    Route::get('/support-requests/{supportRequest}/chat', [
        SupportMessageController::class,
        'index',
    ])->name('support-requests.chat');

    Route::post('/support-requests/{supportRequest}/messages', [
        SupportMessageController::class,
        'store',
    ])->name('support-messages.store');

    Route::get('/client/dashboard', function (Request $request) {
        abort_unless($request->user()->role === 'client', 403);

        $user = $request->user();
        $requests = $user->supportRequests()->latest()->get();

        return Inertia::render('dashboard', [
            'requests' => $requests->map(fn ($item) => [
                'id' => 'VH-' . str_pad((string) $item->id, 3, '0', STR_PAD_LEFT),
                'subject' => $item->subject,
                'category' => $item->category,
                'status' => $item->status,
                'date' => $item->created_at->format('M d, Y'),
            ]),
            'stats' => [
                'total' => $requests->count(),
                'pending' => $requests->where('status', 'Pending')->count(),
                'inProgress' => $requests->where('status', 'In Progress')->count(),
                'resolved' => $requests->where('status', 'Resolved')->count(),
            ],
        ]);
    })->name('client.dashboard');

    Route::get('/agent/dashboard', function (Request $request) {
        abort_unless($request->user()->role === 'agent', 403);

        return Inertia::render('agent/dashboard');
    })->name('agent.dashboard');

    Route::get('/main-admin/dashboard', function (Request $request) {
        abort_unless($request->user()->role === 'main_admin', 403);

        return Inertia::render('main-admin/dashboard');
    })->name('main-admin.dashboard');
});

require __DIR__.'/settings.php';
