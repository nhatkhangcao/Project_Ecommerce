<?php

namespace App\Repositories;

use App\Models\Combo;
use App\Models\Meal;
use Illuminate\Http\Response;

class MealRepository
{
    public function index()
    {
        return Combo::orderBy('id', 'DESC')->paginate(10);
    }
    public function add($request)
    {
        $dataCreate = [
            'combo_name'    => $request->combo_name,
            'combo_price'   => $request->combo_price,
            'meal_number'   => $request->meal_number,
            'description'   => $request->description,
            'detail'        => $request->detail,
            'calories'      => $request->calories
        ];
        if ($request->file('combo_image')) {
            $file = $request->file('combo_image');
            $filename = 'uploads/' . date('YmdHi') . $file->getClientOriginalName();
            $file->move(('uploads/'), $filename);
            $dataCreate['combo_image']  =  $filename;
        }
        return Combo::create($dataCreate);
    }
    public function checkExistCombo($comboName)
    {
        $existCombo = Combo::where('combo_name', $comboName)->exists();
        if ($existCombo) {
            return true;
        } else {
            return false;
        }
    }
    public function edit($id, $request)
    {
        $dataUpdate = [
            'combo_price'   => $request->combo_price,
            'description'   => $request->description,
            'detail'        => $request->detail,
            'meal_number'   => $request->meal_number,
            'calories'      => $request->calories,
        ];
        if ($request->file('combo_image')) {
            $file = $request->file('combo_image');
            $filename = 'uploads/' . date('YmdHi') . $file->getClientOriginalName();
            $file->move(('uploads/'), $filename);
            $dataUpdate['combo_image']  =  $filename;
        }
        $combo = Combo::find($id)->update($dataUpdate);
        return $combo;
    }
    public function delete($id)
    {
        $dataDelete = Combo::find($id)->delete();
        return $dataDelete;
    }

    public function searchCombo($request)
    {
        if (isset($request['combo_name'])) {
            $dataSearch = Combo::where('combo_name', 'LIKE', '%' . $request['combo_name'] . '%');
        }
        return $dataSearch->orderBy('id', 'DESC')->paginate(10);
    }
}
