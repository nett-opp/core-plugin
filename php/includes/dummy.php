<?php
if (!defined("ABSPATH")) {
    exit();
}

add_action("rest_api_init", function () {
    register_rest_route("custom/v1", "/dummy", [
        "methods" => "GET",
        "callback" => function () {
            return [
                "message" => "Hello from WordPress 👋",
                "status" => "ok",
            ];
        },
        "permission_callback" => function () {
            return current_user_can("manage_options");
        },
    ]);
});
