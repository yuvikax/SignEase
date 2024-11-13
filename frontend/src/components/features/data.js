import { FaAccessibleIcon, FaGg } from "react-icons/fa";
import { SiDatabricks } from "react-icons/si";
import { MdConnectWithoutContact } from "react-icons/md";

export const FeatureList = [
  {
    id: 1,
    icon: <FaAccessibleIcon color="#0a1930" size={22} />,
    heading: "Real-time Translation",
    text: "Instantly translate ISL gestures into text for seamless communication."
  },
  {
    id: 2,
    icon: <SiDatabricks color="#0a1930" size={22} />,
    heading: "Personalized Learning",
    text: "Learn ISL at your own pace with interactive tutorials and quizzes."
  },
  {
    id: 3,
    icon: <MdConnectWithoutContact color="#0a1930" size={22} />,
    heading: "User-Friendly Interface",
    text: "Enjoy a simple and intuitive interface designed for easy navigation."
  },
  {
    id: 4,
    icon: <FaGg color="#0a1930" size={22} />,
    heading: "Secure and Private",
    text: "Your data is safe and secure with our robust security measures."
  },
];