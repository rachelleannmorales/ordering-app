@component('mail::message')
# Order Status Update

Hello {{ $user->name }},

Your order with order ID {{ $order->id }} has been updated. Here is the updated status:

**Order Status:** {{ $order->status }}

Best regards,<br>
The Team
@endcomponent