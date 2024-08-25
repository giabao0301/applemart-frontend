import Image from "next/image";

const Footer = () => {
  return (
    <footer className="flex flex-col space-y-10 justify-center m-10 relative max-w-md lg:max-w-screen-lg lg:mx-auto h-56 border-t border-solid border-[#e7e7e8]">
      <nav className="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
        <a className="hover:text-gray-900 text-sm" href="#">
          Cửa hàng
        </a>
        <a className="hover:text-gray-900 text-sm" href="#">
          Mac
        </a>
        <a className="hover:text-gray-900 text-sm" href="#">
          iPad
        </a>
        <a className="hover:text-gray-900 text-sm" href="#">
          iPhone
        </a>
        <a className="hover:text-gray-900 text-sm" href="#">
          Watch
        </a>
        <a className="hover:text-gray-900 text-sm" href="#">
          AirPods
        </a>
        <a className="hover:text-gray-900 text-sm" href="#">
          Phụ kiện
        </a>
      </nav>

      <div className="flex justify-center space-x-5">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="https://img.icons8.com/fluent/30/000000/facebook-new.png"
            width={32}
            height={32}
            alt="facebook"
          />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="https://img.icons8.com/fluent/30/000000/linkedin-2.png"
            width={32}
            height={32}
            alt="linkedin"
          />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="https://img.icons8.com/fluent/30/000000/instagram-new.png"
            width={32}
            height={32}
            alt="instagram"
          />
        </a>
        <a
          href="https://messenger.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="https://img.icons8.com/fluent/30/000000/facebook-messenger--v2.png"
            width={32}
            height={32}
            alt="messenger"
          />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <Image
            src="https://img.icons8.com/fluent/30/000000/twitter.png"
            width={32}
            height={32}
            alt="twitter"
          />
        </a>
      </div>
      <p className="text-center text-gray-700 font-medium text-sm">
        Bản quyền © 2025 Applemart Inc. Bảo lưu mọi quyền.
      </p>
    </footer>
  );
};

export default Footer;
