import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <nav>
        NavBar
        <div>
          <button>
            <Link href="./login">Login</Link>
            <Link href="./register">Register</Link>
          </button>
        </div>
      </nav>
      Home Page
    </>
  );
}
