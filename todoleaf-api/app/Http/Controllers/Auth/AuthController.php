<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        Log::info("passs");
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        Log::info(Auth::attempt($credentials));

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            Log::info($user);
            $token = $user->createToken('MyAppToken')->accessToken;
            Log::info($token);

            return response()->json([
                'success' => true,
                'token' => $token,
                'user' => $user
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }
    }
}

