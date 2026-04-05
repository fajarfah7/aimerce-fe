"use client";

import { ProfileButton } from "./header/profile/profile";
import { CartButton } from "./header/cart/cart";
import { Logo } from "./header/logo/logo";
import { SearchProduct } from "./product/search-product/search-product";

type HeaderProps = {
  isLoggedIn: boolean;
};

export default function HeaderClient({ isLoggedIn }: HeaderProps) {
  const handleLogout = () => {
    alert("logout");
  };
  const totalCart: number = 99;
  const name: string = "Fajar Fahrurozi";

  return (
    <header className="flex justify-between p-4 border-b-2">
      <div className="flex justify-baseline w-full">
        <Logo />
      </div>
      <div className="flex justify-center w-full">
        <SearchProduct />
      </div>
      {isLoggedIn && (
        <div className="flex justify-end w-full gap-2">
          <CartButton totalCart={totalCart} />
          <ProfileButton name={name} handleLogout={handleLogout} />
        </div>
      )}
    </header>
  );
}
