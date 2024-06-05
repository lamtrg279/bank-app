import HeaderBox from "@/components/ui/HeaderBox";
import RightSidebar from "@/components/ui/RightSidebar";
import TotalBalanceBox from "@/components/ui/TotalBalanceBox";
import React from "react";

const Home = () => {
  const loggedIn = {
    firstName: "Lam",
    lastName: "Truong",
    email: "truong@gmail.com"
  };

  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
            type='greeting'
            title='Welcome'
            user={loggedIn?.firstName || "Guest"}
            subtext='Access and manage your account and transcation efficiently'
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={10.24}
          />
        </header>
      </div>
      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 123.45 }, { currentBalance: 98.76 }]}
      />
    </section>
  );
};

export default Home;
