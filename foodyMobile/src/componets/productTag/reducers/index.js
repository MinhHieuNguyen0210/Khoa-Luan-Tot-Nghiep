import * as actionType from "../action/actionType";

const initialState = {
    //initalState giá trị khởi tạo ban đầu
    cartAr: [],
    totalprice: 0,
};

//hàm cartReducer sẽ nhận vào 2 tham số để xử lý ,
//state = initalState : là giá trị khởi tọa ban đầu,
//action :hành động sẽ thực thi với giá trị đó
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.BUY_PRODUCT:
            let newprobuy = state.cartAr;
            let probuy = action.payload.id;
            const productInCart = newprobuy.find(
                (p) => p.id == probuy
            );  
            if (!productInCart) {
                const newarrC = [...state.cartAr, action.payload];
                const objIndext = newarrC.findIndex(
                    (obj) => obj.id == action.payload.id
                );
                newarrC[objIndext] = { ...newarrC[objIndext], quantity: 1 };
                let pricet = 0;
                newarrC.map((pr) => (pricet = pricet + pr.price * pr.quantity));
                // Alert.alert("Add successful");
                return {
                    cartAr: newarrC,
                    totalprice: pricet,
                };
            } else {
                let newprocart = state.cartAr;
                const objIndext = newprocart.findIndex(
                    (obj) => obj.id == action.payload.id
                );
                if (newprocart[objIndext] === 1) {
                    newprocart[objIndext] = {
                        ...newprocart[objIndext],
                        quantity: 2,
                    };
                } else {
                    newprocart[objIndext].quantity =
                        newprocart[objIndext].quantity + 1;
                }
                let pricet = 0;
                newprocart.map(
                    (pr) => (pricet = pricet + pr.price * pr.quantity)
                );
                // Alert.alert("Add successful");
                return {
                    cartAr: [...newprocart],
                    totalprice: pricet,
                };
            }

        case actionType.DELETE_PRODUCT:
            let newcart = state.cartAr;
            const objIndex = newcart.findIndex(
                (obj) => obj.id === action.payload.id
            );
            let newtotal;
            newtotal =
                state.totalprice -
                newcart[objIndex].price * newcart[objIndex].quantity;
            newcart.splice(objIndex, 1);
            return { cartAr: [...newcart], totalprice: newtotal };

        case actionType.INCREASE_PRODUCT:
            let newproc = state.cartAr;
            let proidincre = action.payload.id;
            let objIndext = newproc.findIndex(
                (obj) => obj.id == proidincre
            );
            if(action.payload.productID) {
                proidincre = action.payload.productID;
                objIndext = newproc.findIndex(
                (obj) => obj.productID == proidincre
                );
            }
 
            newproc[objIndext] = {
                ...newproc[objIndext],
                quantity: newproc[objIndext].quantity + 1,
            };
            let pricet = 0;
            newproc.map((pr) => (pricet = pricet + pr.price * pr.quantity));
            // console.log('>>name',state.cartAr.quantity)
            return { cartAr: [...newproc], totalprice: pricet };

        case actionType.DECREASE_PRODUCT:
            let newcartpro = state.cartAr;
            let proiddecre = action.payload.id;
            let objIndextd = newcartpro.findIndex(
                (obj) => obj.id == proiddecre
            );
            if(action.payload.productID) {
                proiddecre = action.payload.productID;
                objIndextd = newcartpro.findIndex(
                (obj) => obj.productID == proiddecre
                );
            }
            if (newcartpro[objIndextd].quantity > 1) {
                newcartpro[objIndextd] = {
                    ...newcartpro[objIndextd],
                    quantity: newcartpro[objIndextd].quantity - 1,
                };
            }
            pricet = 0;
            newcartpro.map((pr) => (pricet = pricet + pr.price * pr.quantity));
            return { cartAr: [...newcartpro], totalprice: pricet };

        case actionType.DELALL_PRODUCT:
            return {
                cartAr: [],
                totalprice: 0,
            };
        case actionType.GET_CART:
            console.log(">>action.payload",action.payload)
            let newtotalamount = action.payload.products;  
            console.log("newtotalamount",newtotalamount)     
            pricet = 0;
            newtotalamount.map((pr) => (pricet = pricet + pr.price *pr.quantity))
            newtotalamount.map((pro)=>pro.id = pro.productID);
            return {
                cartAr: [...action.payload.products],
                totalprice: pricet,
                // totalprice: action.payload.totalAmount,
            };
              

        case actionType.UPDATE_PRODUCT:
            let newcartupdate = state.cartAr;
            const objIndexCart = action.payload;
            newcartupdate[objIndexCart] = {
                ...newcartupdate[objIndexCart],
            };
            pricet = totalAmount;
            return { cartAr: [...newcartupdate], totalprice: pricet };

        default:
            return state;
    }
};

export default cartReducer;
