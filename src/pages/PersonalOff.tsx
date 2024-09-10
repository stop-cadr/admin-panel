import { ChangeEvent, useRef, useState } from "react";

export const PersonalOff = () => {
  const [isActive, setIsActive] = useState(false);
  const togglePassword = () => setIsActive((prev) => !prev);

  const hiddenFileInput = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = event.target.files?.[0];
    if (fileUploaded) {
      console.log(`выбран файл: ${fileUploaded.name}`);
    }
  };
  return (
    <section className="pt-14">
      <div className="flex gap-5 pl-5 h-[30%]">
        <div>
          <div className="flex items-center justify-center bg-[#F5F6F7] w-[102px] h-[102px] rounded-md">
            <img src="./image/photo.png" alt="" />
          </div>
        </div>

        <div className="flex flex-col gap-5 ">
          <div className="flex flex-col gap-1 ">
            <p className="text-[12px] font-black">Администратор</p>
            <p className="text-[#B8C1CC] text-[12px]">Личный кабинет</p>
          </div>
          <button
            onClick={handleClick}
            className="bg-customBlue text-white w-[341px] h-10 rounded-md"
          >
            Загрузить фото
          </button>
          <input
            onChange={handleChange}
            ref={hiddenFileInput}
            className=" hidden"
            type="file"
          />
        </div>
      </div>
      <hr className="border-t border-gray-300 mt-8" />

      <div className="flex flex-col pl-5 gap-6 p-10">
        <div className=" flex flex-col gap-3 ">
          <p>Имя</p>
          <input
            type="text"
            className=" border border-gray-300 rounded-md p-1 w-[465px] h-10"
          />
        </div>
        <div className=" flex flex-col gap-3">
          <p>Номер телефона</p>
          <input
            type="text"
            className=" border border-gray-300 rounded-md p-1 w-[465px] h-10"
          />
        </div>
        <div className=" flex flex-col gap-3">
          <p>E-mail</p>
          <input
            type="text"
            className=" border border-gray-300 rounded-md p-1 w-[465px] h-10"
          />
        </div>
        <div>
          <div className="flex flex-col gap-6">
            <p>Пароль</p>
            <div className="flex flex-col items-center relative max-w-[465px]">
              <button
                onClick={togglePassword}
                className="pl-[12px] border border-gray-300 rounded-md w-full max-w-[465px] h-10 text-left font-light"
              >
                Сменить пароль
              </button>

              <img
                src="./image/Polygon 5.png"
                className=" absolute cursor-pointer top-4 right-[14px]"
              />
              {isActive && (
                <div className="flex flex-col gap-5 pt-5">
                  <input
                    type="password"
                    placeholder="Старый пароль"
                    className=" border border-gray-300 rounded-md p-3 w-[465px] h-10"
                  />

                  <input
                    type="password"
                    placeholder="Новый пароль"
                    className=" border border-gray-300 rounded-md p-3 w-[465px] h-10"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <button className="bg-customBlue mb-32 h-10 w-[465px] text-white rounded-md cursor-pointer ">
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};