<?php

namespace App\Http\Controllers;

use App\Category;
use App\Expense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ExpenseController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(Request $request, Expense $expense)
    {

        //$listCategories = Category::all();
        // get all the tasks based on current user id
        //$allExpenses = $expense->whereIn('user_id', $request->user())->with('user');
        $allExpenses = $expense->where(['user_id' => auth()->id()])->with('category');
        $expenses = $allExpenses->orderBy('expense_date', 'desc')->take(10)->get();

        $listCategories = Category::all();


        // return json response
        return response()->json([
            'expenses' => $expenses,
            'listCategories' => $listCategories,
            //'pie' => $pie,
            //'charts' => $charts,
        ]);
    }


    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        $this->validate($request, [
            'exp_name' => 'required',
            'amount' => 'required',
            'category_id' => 'required',
            'expense_date' => 'required',
        ]);
        // create a new task based on user tasks relationship

        $expense = $request->user()->expenses()->create([
            'exp_name' => $request->exp_name,
            'amount' => $request->amount,
            'category_id' => $request->category_id,
            'expense_date' => $request->expense_date,
        ]);
        // return task with user object
        return response()->json($expense->with('user')->find($expense->id));
    }

    public function show(Expense $expense)
    {
        $pie = DB::table('expenses')
            ->join('categories', 'expenses.category_id', '=', 'categories.id')
            ->select(DB::raw('SUM(amount) as total_sales'), 'cat_name')
            ->where(['user_id' => auth()->id()])
            ->groupBy('category_id')
            ->get();
        return response()->json(['pie' => $pie]);
    }

    public function edit(Expense $expense)
    {
        //we use $expense as expense.id
        $editExpense = Expense::findOrFail($expense);
        return response()->json([
            'editExpense' => $editExpense,
        ]);
    }

    public function update(Request $request, Expense $expense)
    {
        $input = $request->all();
        //$expenseUpdate = Expense::findOrFail($expense);
        $expense->update($input);
        //return response()->json($expense->with('user')->find($expense->id));
        return response()->json($expense);
    }


    public function destroy($id)
    {
        Expense::findOrFail($id)->delete();
    }

    public function pie()
    {
        // $pie = DB::table('expenses')
        //     ->join('categories', 'expenses.category_id', '=', 'categories.id')
        //     ->select(DB::raw('SUM(amount) as total_sales'), 'cat_name')
        //     ->where(['user_id' => auth()->id()])
        //     ->groupBy('category_id')
        //     ->get();
        $pie = Category::all();
        return response()->json(['pie' => $pie]);
    }
}
