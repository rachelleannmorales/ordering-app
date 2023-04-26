<?php

namespace App\Listeners;

use App\Events\OrderCreated;
use App\Mail\OrderCreatedEmail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Mail;

class SendOrderCreatedEmail
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(OrderCreated $event): void
    {
        Mail::to($event->order->user->email)->send(new OrderCreatedEmail($event->order));
    }
}
