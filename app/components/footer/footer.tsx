import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../assets/logo.png';

const shopLinks = [
  { label: 'All drinks', href: '/products' },
  { label: 'Cart', href: '/cart' },
  { label: 'Track an order', href: '/track-order' },
];

const memberLinks = [
  { label: 'Rewards program', href: '/rewards' },
  { label: 'Create account', href: '/signup' },
  { label: 'Order history', href: '/orders' },
];

const merchantLinks = [
  { label: 'Merchant sign in', href: '/merchant/login' },
];

type FooterColumnProps = {
  title: string;
  links: { label: string; href: string }[];
};

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="text-[14px] font-bold leading-none tracking-[0.02em] text-white/80">
        {title}
      </h3>
      <nav className="mt-5 flex flex-col gap-4 sm:mt-7">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="w-fit text-[14px] font-normal leading-none text-white/90 transition-opacity hover:opacity-70"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-[#DE171E] text-white">
      {/* Main footer section */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-12 lg:py-20">
        <div className="grid grid-gap-10 grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          
          {/* Logo + description */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block">
              <Image
                src={logo}
                alt="RiiFresh"
                width={160}
                height={70}
                className="h-auto w-39 object-contain"
              />
            </Link>
            <p className="mt-6 max-w-sm text-[16px] font-normal leading-[1.45] text-white/85 sm:text-[17px]">
              Freshly brewed, never concentrate. Delivered chilled from our{' '}
              <br className="hidden sm:block" /> kitchen to your door within 24 hours.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-3">
            <FooterColumn title="SHOP" links={shopLinks} />
            <FooterColumn title="MEMBERS" links={memberLinks} />
            <FooterColumn title="MERCHANT" links={merchantLinks} />
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="flex min-h-16 items-center justify-center border-t border-white/10 px-6 py-4 text-center">
        <p className="text-[14px] font-normal text-white/75">
          © 2026 RiiFresh Drinks. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
// import Image from "next/image";
// import Link from "next/link";

// import logo from "../../../assets/logo.png";

// const shopLinks = [
//   {
//     label: "All drinks",
//     href: "/products",
//   },
//   {
//     label: "Cart",
//     href: "/cart",
//   },
//   {
//     label: "Track an order",
//     href: "/track-order",
//   },
// ];

// const memberLinks = [
//   {
//     label: "Rewards program",
//     href: "/rewards",
//   },
//   {
//     label: "Create account",
//     href: "/signup",
//   },
//   {
//     label: "Order history",
//     href: "/orders",
//   },
// ];

// const merchantLinks = [
//   {
//     label: "Merchant sign in",
//     href: "/merchant/login",
//   },
// ];

// type FooterColumnProps = {
//   title: string;
//   links: {
//     label: string;
//     href: string;
//   }[];
// };

// function FooterColumn({
//   title,
//   links,
// }: FooterColumnProps) {
//   return (
//     <div>
//       <h3 className="text-[14px] font-bold leading-none tracking-[0.02em] text-white/80">
//         {title}
//       </h3>

//       <nav className="mt-7 flex flex-col gap-4">
//         {links.map((link) => (
//           <Link
//             key={link.href}
//             href={link.href}
//             className="w-fit text-[14px] font-normal leading-none text-white/90 transition-opacity hover:opacity-70"
//           >
//             {link.label}
//           </Link>
//         ))}
//       </nav>
//     </div>
//   );
// }

// export default function Footer() {
//   return (
//     <footer className="w-full bg-[#DE171E] text-white">
//       {/* Main footer section */}
//       <div className="relative h-90 w-full">
//         {/* Logo + description */}
//         <div className="absolute left-35 top-26 w-146">
//           <Link href="/" className="inline-block">
//             <Image
//               src={logo}
//               alt="RiiFresh"
//               width={160}
//               height={70}
//               className="h-auto w-39 object-contain"
//             />
//           </Link>

//           <p className="mt-6 max-w-145 text-[17px] font-normal leading-[1.45] text-white/85">
//             Freshly brewed, never concentrate. Delivered chilled from our
//             <br className="hidden sm:block" />
//             kitchen to your door within 24 hours.
//           </p>
//         </div>

//         {/* SHOP */}
//         <div className="absolute left-[39.7%] top-26">
//           <FooterColumn
//             title="SHOP"
//             links={shopLinks}
//           />
//         </div>

//         {/* MEMBERS */}
//         <div className="absolute left-[60.3%] top-26">
//           <FooterColumn
//             title="MEMBERS"
//             links={memberLinks}
//           />
//         </div>

//         {/* MERCHANT */}
//         <div className="absolute left-[80.7%] top-26">
//           <FooterColumn
//             title="MERCHANT"
//             links={merchantLinks}
//           />
//         </div>
//       </div>

//       {/* Copyright */}
//       <div className="flex h-25 items-center justify-center border-t border-white/10">
//         <p className="text-[14px] font-normal text-white/75">
//           © 2026 RiiFresh Drinks. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// }