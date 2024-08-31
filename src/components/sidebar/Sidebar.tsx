export const Sidebar = () => {
    return (
      <section className="flex flex-col h-full p-4 mt-2 max-w-full">
        <header className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <img
              className="border-2 rounded-full border-white mr-3"
              src="./image/R.png"
              alt="icon"
            />
  
            <div>
              <p className="text-white text-[18px] font-semibold">Азамат</p>
              <p className="text-slate-300 text-[11px] font-normal">Директор</p>
            </div>
          </div>
  
          <div>
            <img src="./image/e.png" alt="exit" />
          </div>
        </header>
        <main>
          {/* <div>date</div>
          <div>calendar</div> */}
        </main>
        <footer className="text-white flex gap-5 flex-col mt-64">
          <div className="flex items-center">
            <img className="mr-2" src="./image/home.png" alt="" />
            <p>Личный кабинет</p>
          </div>
          <div className="flex items-center">
            <img className="mr-4" src="./image/Vector.png" alt="" />
            <p className="text-customBlue">Заказы</p>
          </div>
          <div className="flex items-center">
            <img className="mr-2" src="./image/check.png" alt="$" />
            <p>Бухгалтерия</p>
          </div>
          <div className="flex items-center">
            <img className="mr-2" src="./image/chart.png" alt="users" />
            <p>Пользователи</p>
          </div>
          <div className="flex items-center">
            <img className="mr-2" src="./image/wallet-2.png" alt="database" />
            <p>База данных</p>
          </div>
          <div className="flex items-center">
            <img className="mr-2" src="./image/html-5.png" alt="employees" />
            <p>Сотрудники</p>
          </div>
          <div className="flex items-center">
            <img className="mr-2" src="./image/not.png" alt="notification" />
            <p>Настройки</p>
          </div>
        </footer>
      </section>
    );
  };
  