import {
  FaDashcube,
  FaFileInvoice,
  FaWallet,
  FaChartBar,
  FaDatabase,
} from "react-icons/fa";
import {
  RxAvatar,
  RxMobile,
  RxArrowUp,
  RxArrowDown,
  RxCheck,
} from "react-icons/rx";

export const dashbord_item = [
  {
    id: 1,
    name: "Event",
    logo: FaDashcube,
    link: "/events",
  },
  {
    id: 3,
    name: "Wallet",
    logo: FaWallet,
    link: "",
  },
  {
    id: 2,
    name: "Invoice",
    logo: FaFileInvoice,
    link: "",
  },
  {
    id: 4,
    name: "Reports",
    logo: FaChartBar,
    link: "",
  },
  {
    id: 5,
    name: "Transactions",
    logo: FaDatabase,
    link: "",
  },
];

export const middle_matrix_items = [
  {
    id: 1,
    type: "Total income",
    amount: 18532,
    uptrend: true,
    percent: 11,
  },
  {
    id: 2,
    type: "Total Savings",
    amount: 137,
    uptrend: false,
    percent: -8,
  },
  {
    id: 3,
    type: "Total Expense",
    amount: 5000,
    uptrend: true,
    percent: 8,
  },
  {
    id: 4,
    type: "Upcoming",
    amount: 201,
    uptrend: true,
    percent: 8,
  },
];

export const latest_transaction = [
  {
    id: 1,
    transaction_type: "Transfer to Johdi",
    description: "Personal Payment",
    avatar: RxAvatar,
    background: "rgb(110, 110, 163)",
    font: "rgb(32, 32, 126)",
    amount: -35.0,
  },
  {
    id: 2,
    transaction_type: "Nike",
    description: "Shopping",
    avatar: RxCheck,
    background: "rgb(110, 110, 163)",
    font: "rgb(32, 32, 126)",
    amouunt: -120.0,
  },
  {
    id: 3,
    transaction_type: "Mobile Phone Top-Up",
    description: "Communication",
    avatar: RxMobile,
    background: "rgb(110, 110, 163)",
    font: "rgb(32, 32, 126)",
    amouunt: -10.0,
  },
  {
    id: 4,
    transaction_type: "Balance Top-Up",
    description: "Personal Payment",
    avatar: RxArrowUp,
    background: "rgb(110, 163, 130)",
    font: "rgb(14, 109, 50)",
    amouunt: +300.0,
  },
  {
    id: 5,
    transaction_type: "Withdrawal",
    description: "Personal Payment",
    avatar: RxArrowDown,
    background: "rgb(163, 110, 110)",
    font: "rgb(143, 29, 29)",
    amouunt: -300.0,
  },
];

export const upcoming_event = [
  {
    id: 4,
    title: "Contribute to medical building",
    img: "/images/helping-hand-moonlight.jpg",
    participant1: "/images/bearded_man.jpg",
    participant3: "/images/couple-facemask.jpg",
    participant2: "/images/Girl2_generated.jpg",
    part_number: 38,
    day: 10,
    month: "June",
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 2,
    title: "Build a Community",
    img: "/images/american-football-character.jpg",
    participant3: "/images/bearded_man.jpg",
    participant2: "/images/female-social-profile.jpg",
    participant1: "/images/Girl2_generated.jpg",
    day: 10,
    part_number: 47,
    month: "June",
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 1,
    title: "Sacred Heart Donation",
    img: "/images/activism-donation.jpg",
    participant1: "/images/bearded_man.jpg",
    participant2: "/images/couple-facemask.jpg",
    participant3: "/images/Girl2_generated.jpg",
    day: 10,
    month: "June",
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 3,
    title: "Help Segun",
    img: "/images/help-a-friend.jpg",
    participant1: "/images/bearded_man.jpg",
    participant2: "/images/couple-facemask.jpg",
    participant3: "/images/Girl2_generated.jpg",
    day: 10,
    part_number: 15,
    month: "June",
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
];
export const health_related_event = [
  {
    id: 4,
    title: "Contribute to medical building",
    img: "/images/helping-hand-moonlight.jpg",
    participant1: "/images/bearded_man.jpg",
    participant3: "/images/couple-facemask.jpg",
    participant2: "/images/Girl2_generated.jpg",
    part_number: 38,
    day: 10,
    month: "June",
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 2,
    title: "Build a Community",
    img: "/images/american-football-character.jpg",
    participant3: "/images/bearded_man.jpg",
    participant2: "/images/female-social-profile.jpg",
    participant1: "/images/Girl2_generated.jpg",
    day: 10,
    part_number: 47,
    month: "June",
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 1,
    title: "Sacred Heart Donation",
    img: "/images/activism-donation.jpg",
    participant1: "/images/bearded_man.jpg",
    participant2: "/images/couple-facemask.jpg",
    participant3: "/images/Girl2_generated.jpg",
    day: 10,
    month: "June",
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 3,
    title: "Help Segun",
    img: "/images/help-a-friend.jpg",
    participant1: "/images/bearded_man.jpg",
    participant2: "/images/couple-facemask.jpg",
    participant3: "/images/Girl2_generated.jpg",
    day: 10,
    part_number: 15,
    month: "June",
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
];