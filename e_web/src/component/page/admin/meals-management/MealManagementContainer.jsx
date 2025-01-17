import React from 'react';
import MealManagementComponent from './MealManagementComponent';
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';

function MealManagementContainer(props) {
    const [dataList, setDataList] = useState();
    const [paginate, setPaginate] = useState();

    const getMealData = (url) => {
        if (!url) {
            url = 'http://127.0.0.1:8000/api/admin/meals-list'
        }
        axios.get(url).then((response) => {
            setDataList(response.data)
            pagination(response)
        });
    }
    const pagination = (response) => {
        setPaginate(response.data)
    }

    const handleDeleteMeal = (item, e) => {
        Swal.fire({
            title: 'Bạn chắc chắn chứ?',
            text: "Bạn muốn xóa combo " + "[" + item.combo_name + "]",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Hủy bỏ',
            confirmButtonText: 'Đồng ý!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('http://127.0.0.1:8000/api/admin/delete-meal/' + item.id)
                    .then((response) => {
                        getMealData()
                    })
                Swal.fire(
                    'Deleted!',
                    'Your data has been deleted.',
                    'success'
                )
            }
        })
    }

    return (
        <MealManagementComponent
            setDataList={setDataList}
            getMealData={getMealData}
            dataList={dataList}
            paginate={paginate}
            handleDeleteMeal={handleDeleteMeal}
        />
    );
}

export default MealManagementContainer;