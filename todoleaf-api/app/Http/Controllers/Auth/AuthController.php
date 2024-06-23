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
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        // Tentative de connexion
        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            $tokenResult = $user->createToken('Personal Access Token');
            $token = $tokenResult->accessToken;
            $cookie = cookie('jwt', $token, 1440, '/', null, true, true, false, 'Strict');

            return response()->json([
                'success' => true,
                'token' => $token,
                'user' => $user
            ]);
        }
        return response()->json([
            'message' => 'Unauthorized'
        ], 401);
    }
}

