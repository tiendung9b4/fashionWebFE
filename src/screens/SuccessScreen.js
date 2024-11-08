import Button from "../components/button"

export const ResultPage = () => {
    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen"
                style={{
                    backgroundImage: `url(/images/background.jpg)`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: 'cover'
                }}>
                <div className="flex flex-col items-center text-white">
                    <img
                        src="/images/icons/register/success.svg"
                        width={100}
                        height={100}
                        className="w-[100px] h-[100px]"
                        style={{ width: "auto", height: "auto" }}
                        alt="success-check"
                    />
                    <h2 className="text-lightGreen text-[32px] font-bold leading-normal mt-6 mb-3">
                        Chúc mừng
                    </h2>
                    <h3 className="font-normal text-[28px] leading-normal text-center">
                        Bạn đã thanh toán thành công!
                    </h3>
                    <Button
                        title="Trở về Trang chủ"
                        className={"mt-4"}
                    />
                </div>
            </div>
        </>
    )
}