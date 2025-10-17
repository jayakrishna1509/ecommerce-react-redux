import {
    Button,
    Dialog,
    DialogBody,
} from "@material-tailwind/react";
import { useState } from "react";

const BuyNowModal = ({addressInfo,setAddressInfo,buyNowFunction}) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);
    return (
        <>
            <Button
                type="button"
                onClick={handleOpen}
                className="btn-primary btn-block"
            >
                Buy Now
            </Button>
            <Dialog open={open} handler={handleOpen} className="bg-blue-50">
                <DialogBody className="">
                    <div className="mb-3">
                        <input
                            type="text"
                            name="name"
                            value={addressInfo.name}
                            onChange={(e)=>{
                                setAddressInfo({
                                    ...addressInfo,
                                    name:e.target.value
                                })
                            }}
                            placeholder='Enter Your Name'
                            className='bg-blue-50 border border-blue-200 px-2 py-2 w-full rounded-md outline-none text-black placeholder-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="address"
                            value={addressInfo.address}
                            onChange={(e)=>{
                                setAddressInfo({
                                    ...addressInfo,
                                    address:e.target.value
                                })
                            }}
                            placeholder='Enter Your Address'
                            className='bg-blue-50 border border-blue-200 px-2 py-2 w-full rounded-md outline-none text-black placeholder-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="number"
                            name="pincode"
                            value={addressInfo.pincode}
                            onChange={(e)=>{
                                setAddressInfo({
                                    ...addressInfo,
                                    pincode:e.target.value
                                })
                            }}
                            placeholder='Enter Your Pincode'
                            className='bg-blue-50 border border-blue-200 px-2 py-2 w-full rounded-md outline-none text-black placeholder-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            name="mobileNumber"
                            value={addressInfo.mobileNumber}
                            onChange={(e)=>{
                                setAddressInfo({
                                    ...addressInfo,
                                    mobileNumber:e.target.value
                                })
                            }}
                            placeholder='Enter Your Mobile Number'
                            className='bg-blue-50 border border-blue-200 px-2 py-2 w-full rounded-md outline-none text-black placeholder-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                        />
                    </div>

                    <div className="">
                        <Button
                            type="button"
                            onClick={()=>{
                                handleOpen();
                                buyNowFunction();
                            }}
                            className="btn-primary btn-block"
                        >
                            Place Order
                        </Button>
                    </div>

                </DialogBody>
            </Dialog>
        </>
    );
}

export default BuyNowModal;
