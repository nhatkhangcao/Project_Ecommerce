import React from 'react';
import MealDetailModal from './modal/MealDetailModal';
import { useLocation } from 'react-router-dom';

function MealDetailContainer(props) {
    const location = useLocation();
    const { item } = location.state || {};
    if (!item) {
        return <div>Loading...</div>;
    }
    const formatVND = (money) => {
        const formatter = new Intl.NumberFormat("vi-VN");
        return formatter.format(money);
    }

    return (
        <div>
            <main>
                <section className="container py-5">
                    <div className="row detail-card">
                        <div className="col-md-6" >
                            <div className="d-flex justify-content-center">
                                <img
                                    src={`http://localhost:8000/${item.combo_image}`}
                                    alt="Eat Clean Product Image"
                                    className="img-fluid rounded"
                                    style={{ maxWidth: "80%", height: "auto" }}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 align-self-center">
                            <h3 className="mb-3 text-success">COMBO: {item.combo_name}</h3>
                            <p className="font-weight-bold text-danger">Giá: {formatVND(item.combo_price)}VNĐ ({item.meal_number} món)</p>
                            <p className='text-success'>Thành phần:</p>
                            <ul className="list-unstyled ms-2">
                                <li>- Giá trị dinh dưỡng: {item.detail}</li>
                                <li>- {item.description}</li>
                            </ul>
                            <div className='btn-order'>
                                <button className="btn btn-success btn-full">
                                    <MealDetailModal
                                        item={item}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default MealDetailContainer;