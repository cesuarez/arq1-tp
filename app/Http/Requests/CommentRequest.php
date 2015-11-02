<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class CommentRequest extends Request
{
    public function authorize() {
        return true;
    }

    public function rules() {
        return [
            "user_id"  => "required",
            "event_id" => "required",
            "comment"  => "required"
        ];
    }
}
