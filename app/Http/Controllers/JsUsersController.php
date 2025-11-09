<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\Models\JsUser;
use Illuminate\Http\Request;

class JsUsersController extends Controller
{
    public function index(Request $request)
    {
        $user = JsUser::all();

        if ($request->ajax()) {
            return view('table', compact('user'));
        }
        return view('usersContent.index', compact('user'));
    }

    public function getUsersJson()
    {
        return response()->json(JsUser::all());
    }

    public function store(CreateUserRequest $request)
    {
        $user = JsUser::create($request->validated());
        return response()->json([
            'message' => 'User created successfully',
            'user' => $user,
        ], 201);
    }

    public function show(JsUser $user)
    {
        return response()->json([
            'user' => $user
        ]);
    }

    public function update(CreateUserRequest $request, JsUser $user)
    {
        $user->update($request->validated());
        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user,
        ]);
    }

    public function destroy(JsUser $user)
    {
        $user->delete();
        return response()->json(['message' => 'User deleted'], 200);
    }
}
