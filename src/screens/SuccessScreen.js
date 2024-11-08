import Button from "../components/button"

export const ResultPage = () => {
    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen"
                style={{
                    backgroundImage: `url(/images/background.jpg)`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: 'cover',
                }}>
                <div className="flex flex-col items-center text-white">
                    <img
                        src="/images/icons/register/success.svg"
                        width={150}
                        height={150}
                        className="w-[150px] h-[150px]"
                        alt="success-check"
                    />
                    <h2 className="text-lightGreen text-[32px] font-extrabold leading-normal mt-6 mb-3">
                        Chúc mừng
                    </h2>
                    <h3 className="text-[28px] font-semibold leading-normal text-center">
                        Bạn đã thanh toán đơn hàng thành công!
                    </h3>
                    <Button
                        title="Trở về Trang chủ"
                        className={"mt-4"}
                        url={"/"}
                    />
                </div>
            </div>
        </>
    )
}