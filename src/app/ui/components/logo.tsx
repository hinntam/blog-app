import styles from "@/app/ui/styles/home.module.css";
import Link from "next/link";
import Image from "next/image";
export default function Logo() {
    return(
        <div className={`${styles.header_logo}`}>
        <Link href="/" className="Logo">
          <Image src="/logo.svg" alt="Logo" width={100} height={100} />
        </Link>
      </div>
    )
}