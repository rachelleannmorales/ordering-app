<?php

namespace App\Http\Controllers;

use App\Events\OrderCreated;
use App\Models\Order;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::latest()->get();
        return Inertia::render('Order/Index', ['orders' => $orders]);
    }

     /**
     * Display a listing of the resource.
     */
    public function userOrders(User $user)
    {
        $orders = Order::where('user_id', $user->id)->get();
        return Inertia::render('Order/Index', ['orders' => $orders, 'user'=> $user]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $products = Product::all();
        $users = User::all();
        return Inertia::render('Order/Create', ['products'=>$products, 'users'=>$users]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate form input
        $validatedData = $request->validate([
            'user_id' => 'required',
            'products' => 'required|array|min:1',
            'total_amount' => 'required',
        ]);

        // Create new order
        $order = new Order();
        $order->user_id = $validatedData['user_id'];
        $order->total = $validatedData['total_amount']; // Initialize total to zero
        $order->status = 'pending';
        $order->save();

        // Create order_product records
        foreach ($validatedData['products'] as $key => $item) {
            $product = Product::find($item['product']['id']);
        
            $quantity = $item['quantity'];
            $order->products()->attach($product->id, ['quantity' => $quantity, 'price' => $item['amount']]);
            $product->quantity -= $quantity;
            $product->save();
        }

        // Create transaction record
        $transaction = new Transaction();
        $transaction->order_id = $order->id;
        $transaction->amount = $validatedData['total_amount'];
        $transaction->payment_method = 'credit_card'; // Example payment method
        $transaction->status = 'pending';
        $transaction->transaction_id = uniqid(); // Example transaction ID
        $transaction->save();

        $order = Order::with(['user', 'products'])->firstWhere('id',$order->id);
        event(new OrderCreated($order));

        return Redirect::route('orders.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        return Inertia::render('Order/Show', [
            'order' => $order->with(['user', 'products'])->firstWhere('id',$order->id)->toArray()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        $order->delete();
        return Redirect::route('orders.index')->with('status', 'Order deleted successfully');
    }
}
