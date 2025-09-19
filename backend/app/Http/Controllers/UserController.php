<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Profile;

class UserController extends Controller
{
    public function showProfile(Request $request)
    {
        $user = $request->user();
        $profile = $user->profile;

        return response()->json(array_merge(
            $user->toArray(),
            [
                'skills' => $profile ? $profile->skills : [],
                'resumeUrl' => $profile ? $profile->resume_url : null,
                'description' => $profile ? $profile->description : null,
            ]
        ))->header('Cache-Control', 'no-cache, no-store, must-revalidate')
          ->header('Pragma', 'no-cache')
          ->header('Expires', '0');
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'skills' => 'nullable|array',
            'skills.*' => 'string|max:50',
            'resumeUrl' => 'nullable|url|max:255',
            'description' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }

        try {
            $user->name = $request->name;
            $user->save();

            $profileData = [
                'skills' => $request->skills ?? [],
                'resume_url' => $request->resumeUrl,
                'description' => $request->description,
            ];

            $profile = Profile::updateOrCreate(
                ['user_id' => $user->id],
                $profileData
            );

            return response()->json(['message' => 'Profile updated successfully']);
        } catch (\Exception $e) {
            \Log::error('Profile update error: ' . $e->getMessage());
            return response()->json(['message' => 'Could not update profile', 'error' => $e->getMessage()], 500);
        }
    }

    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }

        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status === Password::RESET_LINK_SENT) {
            return response()->json(['message' => 'Password reset link sent to your email']);
        } else {
            return response()->json(['message' => 'Unable to send password reset link'], 500);
        }
    }

    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(\Str::random(60));

                $user->save();
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return response()->json(['message' => 'Password reset successfully']);
        } else {
            return response()->json(['message' => 'Unable to reset password'], 500);
        }
    }
}
