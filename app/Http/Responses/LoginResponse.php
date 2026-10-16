<?php

namespace App\Http\Responses;

use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{
    public function toResponse($request)
    {
        $user = $request->user();

        $route = match ($user->role) {
            'agent' => 'agent.dashboard',
            'main_admin' => 'main-admin.dashboard',
            default => 'client.dashboard',
        };

        return redirect()->route($route);
    }
}
