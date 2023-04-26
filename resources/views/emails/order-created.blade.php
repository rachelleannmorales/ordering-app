@component('mail::message')
# Order Created

Hi {{ $order->user->name }},

Your order#{{ $order->id }} has been created!

Here's a summary of your order:

@component('mail::table')
| Product  | Quantity |
| -------- | -------- |
@foreach($order->products as $product)
| {{ $product->name }} | {{ $product->pivot->quantity }} |
@endforeach
@endcomponent

The total cost of your order is ${{ $order->total_price }}.

Thank you for your order!

Regards,<br>
The team
@endcomponent