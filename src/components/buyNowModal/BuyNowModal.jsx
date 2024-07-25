import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { useState } from "react";

export default function BuyNowModal({ addressInfo, setAddressInfo, buyNow}) {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(!open);
  }

  function onChangeHandler(event){
    setAddressInfo({
      ...addressInfo,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <>
      <Button
        className="w-full my-5 py-4 text-[16px] border-2 hover:bg-white hover:text-black hover:border-black transition-all duration-300"
        onClick={handleOpen}
        type="button"
      >
        Buy Now
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        className="min-w-[400px] p-0 rounded-lg shadow-lg border border-gray-300 bg-white"
      >
        <DialogBody className="flex flex-col justify-center items-center p-6 rounded-lg bg-gray-50">
          <input
            type="text"
            name="name"
            onChange={onChangeHandler}
            value={addressInfo.name}
            placeholder="Enter Your Name"
            className="w-full py-3 px-4 mb-5 outline-none border-2 border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="address"
            onChange={onChangeHandler}
            value={addressInfo.address}
            placeholder="Enter Your Address"
            className="w-full py-3 px-4 mb-5 outline-none border-2 border-gray-300  rounded-lg"
          />
          <input
            type="text"
            name="pincode"
            onChange={onChangeHandler}
            value={addressInfo.pincode}
            placeholder="Enter Your Pincode"
            className="w-full py-3 px-4 mb-5 outline-none border-2 border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="mobileNumber"
            onChange={onChangeHandler}
            value={addressInfo.mobileNumber}
            placeholder="Enter Your Mobile Number"
            className="w-full py-3 px-4 mb-5 outline-none border-2 border-gray-300 rounded-lg"
          />
          <Button
            className="w-full py-4 text-[16px] text-white bg-black hover:bg-white hover:text-black hover:border-black border-2 transition-all duration-300 rounded-lg"
            onClick={()=>{
              handleOpen();
              buyNow();
            }}
            type="button"
          >
            Buy Now
          </Button>
        </DialogBody>
      </Dialog>
    </>
  );
}
