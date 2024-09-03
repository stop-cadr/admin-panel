export const PersonalOff = () => {
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
            <p className="text-[12px]">Администратор</p>
            <p className="text-[#B8C1CC] text-[12px]">Личный кабинет</p>
          </div>
          <button className="bg-customBlue text-white w-[341px] h-10 rounded-md">
            Загрузить фото
          </button>
        </div>
      </div>
      <hr className="border-t border-gray-300 mt-8" />

      <div className="flex flex-col pl-5 gap-6 w-[43%]">
        <div className=" flex flex-col gap-3 ">
          <p>Имя</p>
          <input
            type="text"
            className=" border border-gray-300 rounded-md p-1  h-10"
          />
        </div>
        <div className=" flex flex-col gap-3">
          <p>Номер телефона</p>
          <input
            type="text"
            className=" border border-gray-300 rounded-md p-1 h-10"
          />
        </div>
        <div className=" flex flex-col gap-3">
          <p>E-mail</p>
          <input
            type="text"
            className=" border border-gray-300 rounded-md p-1 h-10"
          />
        </div>
        <div>
          <div className="flex flex-col gap-3">
            <p>Пароль</p>
            <div className="flex items-center relative w-[100%]">
              <input
                type="text"
                placeholder="Сменить пароль"
                className=" border border-gray-300 rounded-md p-3 w-[100%] h-10"
              />
              <img
                src="./image/Polygon 5.png"
                alt=""
                className=" absolute right-4 cursor-pointer"
              />
            </div>
          </div>
          <div className="flex flex-col gap-5 pt-5">
            <input
              type="text"
              placeholder="Старый пароль"
              className=" border border-gray-300 rounded-md p-3 w-[465px] h-10"
            />

            <input
              type="text"
              placeholder="Новый пароль"
              className=" border border-gray-300 rounded-md p-3 w-[465px] h-10"
            />
          </div>
          <button className="bg-customBlue my-6 h-10 w-[465px] text-white rounded-md cursor-pointer">
            Сохранить
          </button>
        </div>
      </div>
    </section>
  );
};
