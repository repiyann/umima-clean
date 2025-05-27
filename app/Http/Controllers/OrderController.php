<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
  public function service(): Response
  {
    return Inertia::render('order/service');
  }

  public function contact(Request $request): Response
  {
    return Inertia::render('order/contact');
  }

  public function summary(Request $request): Response
  {
    return Inertia::render('order/summary');
  }

  public function payment(Request $request): Response
  {
    return Inertia::render('order/payment');
  }

  public function confirmation(Request $request): Response
  {
    return Inertia::render('order/confirmation');
  }
}
