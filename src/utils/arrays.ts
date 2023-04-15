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
    eventName: "Contribute to medical building",
    eventImageName: "/images/helping-hand-moonlight.jpg",
    eventCreator: "James Brady",
    eventCategory: "upcoming_event",
    participant1: "/images/bearded_man.jpg",
    participant3: "/images/couple-facemask.jpg",
    participant2: "/images/Girl2_generated.jpg",
    part_number: 38,
    eventDescription: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt.`,
    completionDeadline: 5,
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 2,
    eventName: "Build a Community",
    eventImageName: "/images/american-football-character.jpg",
    participant3: "/images/bearded_man.jpg",
    participant2: "/images/female-social-profile.jpg",
    eventCreator: "Omobolane Akinpelumi",
    eventCategory: "upcoming_event",
    participant1: "/images/Girl2_generated.jpg",
    eventDescription: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt.`,
    completionDeadline: 2,
    part_number: 47,
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 1,
    eventName: "Sacred Heart Donation",
    eventImageName: "/images/activism-donation.jpg",
    eventCreator: "Mr Ajadi Fowora",
    eventCategory: "upcoming_event",
    participant1: "/images/bearded_man.jpg",
    participant2: "/images/couple-facemask.jpg",
    participant3: "/images/Girl2_generated.jpg",
    eventDescription: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt.`,
    completionDeadline: 7,
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 3,
    eventName: "Help Segun",
    eventImageName: "/images/help-a-friend.jpg",
    eventCreator: "Ogunruku Adesoji",
    eventCategory: "upcoming_event",
    participant1: "/images/bearded_man.jpg",
    participant2: "/images/couple-facemask.jpg",
    participant3: "/images/Girl2_generated.jpg",
    eventDescription: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt.`,
    completionDeadline: 9,
    part_number: 15,
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 5,
    eventName: "Contribute to medical building",
    eventImageName: "/images/helping-hand-moonlight.jpg",
    eventCreator: "Faborode Kunle",
    eventCategory: "upcoming_event",
    participant1: "/images/bearded_man.jpg",
    participant3: "/images/couple-facemask.jpg",
    participant2: "/images/Girl2_generated.jpg",
    part_number: 38,
    eventDescription: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt.`,
    completionDeadline: 1,
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 6,
    eventName: "Build a Community",
    eventImageName: "/images/american-football-character.jpg",
    participant3: "/images/bearded_man.jpg",
    participant2: "/images/female-social-profile.jpg",
    eventCreator: "Folayan Peters",
    eventCategory: "upcoming_event",
    participant1: "/images/Girl2_generated.jpg",
    eventDescription: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt.`,
    completionDeadline: 13,
    part_number: 47,
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 7,
    eventName: "Sacred Heart Donation",
    eventImageName: "/images/activism-donation.jpg",
    eventCreator: "Orebiyi Kolawole",
    eventCategory: "upcoming_event",
    participant1: "/images/bearded_man.jpg",
    participant2: "/images/couple-facemask.jpg",
    participant3: "/images/Girl2_generated.jpg",
    eventDescription: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt.`,
    completionDeadline: 3,
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 8,
    eventName: "Help Segun",
    eventImageName: "/images/help-a-friend.jpg",
    eventCreator: "Yemi Osinbajo",
    eventCategory: "upcoming_event",
    participant1: "/images/bearded_man.jpg",
    participant2: "/images/couple-facemask.jpg",
    participant3: "/images/Girl2_generated.jpg",
    eventDescription: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt.`,
    completionDeadline: 6,
    part_number: 15,
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 9,
    eventName: "Contribute to medical building",
    eventImageName: "/images/helping-hand-moonlight.jpg",
    eventCreator: "Adekunle Omogbepo",
    eventCategory: "upcoming_event",
    participant1: "/images/bearded_man.jpg",
    participant3: "/images/couple-facemask.jpg",
    participant2: "/images/Girl2_generated.jpg",
    part_number: 38,
    eventDescription: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt.`,
    completionDeadline: 16,
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 10,
    eventName: "Build a Community",
    eventImageName: "/images/american-football-character.jpg",
    participant3: "/images/bearded_man.jpg",
    participant2: "/images/female-social-profile.jpg",
    eventCreator: "Olaoosebikan Babarinde",
    eventCategory: "upcoming_event",
    participant1: "/images/Girl2_generated.jpg",
    eventDescription: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt.`,
    completionDeadline: 12,
    part_number: 47,
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 11,
    eventName: "Sacred Heart Donation",
    eventImageName: "/images/activism-donation.jpg",
    eventCreator: "Ranti Ola",
    eventCategory: "upcoming_event",
    participant1: "/images/bearded_man.jpg",
    participant2: "/images/couple-facemask.jpg",
    participant3: "/images/Girl2_generated.jpg",
    eventDescription: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt.`,
    completionDeadline: 4,
    part_number: 32,
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 12,
    eventName: "Help Segun",
    eventImageName: "/images/help-a-friend.jpg",
    eventCreator: "James Brady",
    eventCategory: "upcoming_event",
    participant1: "/images/bearded_man.jpg",
    participant2: "/images/couple-facemask.jpg",
    participant3: "/images/Girl2_generated.jpg",
    eventDescription: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt.`,
    completionDeadline: 8,
    part_number: 15,
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
];
export const health_related_event = [
  {
    id: 4,
    eventName: "Contribute to medical building",
    eventImageName: "/images/helping-hand-moonlight.jpg",
    eventCreator: "James Brady",
    eventCategory: "health_category",
    participant1: "/images/bearded_man.jpg",
    participant3: "/images/couple-facemask.jpg",
    participant2: "/images/Girl2_generated.jpg",
    part_number: 38,
    eventDescription: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt.`,
    completionDeadline: 13,
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 2,
    eventName: "Build a Community",
    eventImageName: "/images/american-football-character.jpg",
    participant3: "/images/bearded_man.jpg",
    participant2: "/images/female-social-profile.jpg",
    eventCreator: "James Brady",
    eventCategory: "health_category",
    participant1: "/images/Girl2_generated.jpg",
    eventDescription: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt.`,
    completionDeadline: 13,
    part_number: 47,
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 1,
    eventName: "Sacred Heart Donation",
    eventImageName: "/images/activism-donation.jpg",
    eventCreator: "James Brady",
    eventCategory: "health_category",
    participant1: "/images/bearded_man.jpg",
    participant2: "/images/couple-facemask.jpg",
    participant3: "/images/Girl2_generated.jpg",
    eventDescription: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt.`,
    completionDeadline: 13,
    part_number: 12,
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 3,
    eventName: "Help Segun",
    eventImageName: "/images/help-a-friend.jpg",
    eventCreator: "James Brady",
    eventCategory: "health_category",
    participant1: "/images/bearded_man.jpg",
    participant2: "/images/couple-facemask.jpg",
    participant3: "/images/Girl2_generated.jpg",
    eventDescription: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt.`,
    completionDeadline: 13,
    part_number: 15,
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 5,
    eventName: "Contribute to medical building",
    eventImageName: "/images/helping-hand-moonlight.jpg",
    eventCreator: "James Brady",
    eventCategory: "health_category",
    participant1: "/images/bearded_man.jpg",
    participant3: "/images/couple-facemask.jpg",
    participant2: "/images/Girl2_generated.jpg",
    part_number: 38,
    eventDescription: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt.`,
    completionDeadline: 13,
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 6,
    eventName: "Build a Community",
    eventImageName: "/images/american-football-character.jpg",
    participant3: "/images/bearded_man.jpg",
    participant2: "/images/female-social-profile.jpg",
    eventCreator: "James Brady",
    eventCategory: "health_category",
    participant1: "/images/Girl2_generated.jpg",
    eventDescription: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt.`,
    completionDeadline: 13,
    part_number: 47,
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 7,
    eventName: "Sacred Heart Donation",
    eventImageName: "/images/activism-donation.jpg",
    eventCreator: "James Brady",
    eventCategory: "health_category",
    participant1: "/images/bearded_man.jpg",
    participant2: "/images/couple-facemask.jpg",
    participant3: "/images/Girl2_generated.jpg",
    eventDescription: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt.`,
    completionDeadline: 13,
    part_number: 19,
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 8,
    eventName: "Help Segun",
    eventImageName: "/images/help-a-friend.jpg",
    eventCreator: "James Brady",
    eventCategory: "health_category",
    participant1: "/images/bearded_man.jpg",
    participant2: "/images/couple-facemask.jpg",
    participant3: "/images/Girl2_generated.jpg",
    eventDescription: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt.`,
    completionDeadline: 13,
    part_number: 15,
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 9,
    eventName: "Contribute to medical building",
    eventImageName: "/images/helping-hand-moonlight.jpg",
    eventCreator: "James Brady",
    eventCategory: "health_category",
    participant1: "/images/bearded_man.jpg",
    participant3: "/images/couple-facemask.jpg",
    participant2: "/images/Girl2_generated.jpg",
    part_number: 38,
    eventDescription: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt.`,
    completionDeadline: 13,
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 10,
    eventName: "Build a Community",
    eventImageName: "/images/american-football-character.jpg",
    participant3: "/images/bearded_man.jpg",
    participant2: "/images/female-social-profile.jpg",
    eventCreator: "James Brady",
    eventCategory: "health_category",
    participant1: "/images/Girl2_generated.jpg",
    eventDescription: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt.`,
    completionDeadline: 13,
    part_number: 47,
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 11,
    eventName: "Sacred Heart Donation",
    eventImageName: "/images/activism-donation.jpg",
    eventCreator: "James Brady",
    eventCategory: "health_category",
    participant1: "/images/bearded_man.jpg",
    participant2: "/images/couple-facemask.jpg",
    participant3: "/images/Girl2_generated.jpg",
    eventDescription: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt.`,
    completionDeadline: 13,
    part_number: 17,
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 12,
    eventName: "Help Segun",
    eventImageName: "/images/help-a-friend.jpg",
    eventCreator: "James Brady",
    eventCategory: "health_category",
    participant1: "/images/bearded_man.jpg",
    participant2: "/images/couple-facemask.jpg",
    participant3: "/images/Girl2_generated.jpg",
    eventDescription: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt.`,
    completionDeadline: 13,
    part_number: 15,
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
];
export const academic_related_event = [
  {
    id: 4,
    eventName: "Contribute to medical building",
    eventImageName: "/images/helping-hand-moonlight.jpg",
    eventCreator: "James Brady",
    eventCategory: "academic_category",
    participant1: "/images/bearded_man.jpg",
    participant3: "/images/couple-facemask.jpg",
    participant2: "/images/Girl2_generated.jpg",
    part_number: 38,
    eventDescription: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt.`,
    completionDeadline: 13,
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 2,
    eventName: "Build a Community",
    eventImageName: "/images/american-football-character.jpg",
    participant3: "/images/bearded_man.jpg",
    participant2: "/images/female-social-profile.jpg",
    eventCreator: "James Brady",
    eventCategory: "academic_category",
    participant1: "/images/Girl2_generated.jpg",
    eventDescription: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt.`,
    completionDeadline: 13,
    part_number: 47,
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 1,
    eventName: "Sacred Heart Donation",
    eventImageName: "/images/activism-donation.jpg",
    eventCreator: "James Brady",
    eventCategory: "academic_category",
    participant1: "/images/bearded_man.jpg",
    participant2: "/images/couple-facemask.jpg",
    participant3: "/images/Girl2_generated.jpg",
    eventDescription: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt.`,
    completionDeadline: 13,
    part_number: 15,
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 3,
    eventName: "Help Segun",
    eventImageName: "/images/help-a-friend.jpg",
    eventCreator: "James Brady",
    eventCategory: "academic_category",
    participant1: "/images/bearded_man.jpg",
    participant2: "/images/couple-facemask.jpg",
    participant3: "/images/Girl2_generated.jpg",
    eventDescription: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt.`,
    completionDeadline: 13,
    part_number: 15,
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 5,
    eventName: "Contribute to medical building",
    eventImageName: "/images/helping-hand-moonlight.jpg",
    eventCreator: "James Brady",
    eventCategory: "academic_category",
    participant1: "/images/bearded_man.jpg",
    participant3: "/images/couple-facemask.jpg",
    participant2: "/images/Girl2_generated.jpg",
    part_number: 38,
    eventDescription: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt.`,
    completionDeadline: 13,
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 6,
    eventName: "Build a Community",
    eventImageName: "/images/american-football-character.jpg",
    participant3: "/images/bearded_man.jpg",
    participant2: "/images/female-social-profile.jpg",
    eventCreator: "James Brady",
    eventCategory: "academic_category",
    participant1: "/images/Girl2_generated.jpg",
    eventDescription: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt.`,
    completionDeadline: 13,
    part_number: 47,
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 7,
    eventName: "Sacred Heart Donation",
    eventImageName: "/images/activism-donation.jpg",
    eventCreator: "James Brady",
    eventCategory: "academic_category",
    participant1: "/images/bearded_man.jpg",
    participant2: "/images/couple-facemask.jpg",
    participant3: "/images/Girl2_generated.jpg",
    eventDescription: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt.`,
    completionDeadline: 13,
    part_number: 41,
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 8,
    eventName: "Help Segun",
    eventImageName: "/images/help-a-friend.jpg",
    eventCreator: "James Brady",
    eventCategory: "academic_category",
    participant1: "/images/bearded_man.jpg",
    participant2: "/images/couple-facemask.jpg",
    participant3: "/images/Girl2_generated.jpg",
    eventDescription: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt.`,
    completionDeadline: 13,
    part_number: 15,
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 9,
    eventName: "Contribute to medical building",
    eventImageName: "/images/helping-hand-moonlight.jpg",
    eventCreator: "James Brady",
    eventCategory: "academic_category",
    participant1: "/images/bearded_man.jpg",
    participant3: "/images/couple-facemask.jpg",
    participant2: "/images/Girl2_generated.jpg",
    part_number: 38,
    eventDescription: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt.`,
    completionDeadline: 13,
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 10,
    eventName: "Build a Community",
    eventImageName: "/images/american-football-character.jpg",
    participant3: "/images/bearded_man.jpg",
    participant2: "/images/female-social-profile.jpg",
    eventCreator: "James Brady",
    eventCategory: "academic_category",
    participant1: "/images/Girl2_generated.jpg",
    eventDescription: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt.`,
    completionDeadline: 13,
    part_number: 47,
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 11,
    eventName: "Sacred Heart Donation",
    eventImageName: "/images/activism-donation.jpg",
    eventCreator: "James Brady",
    eventCategory: "academic_category",
    participant1: "/images/bearded_man.jpg",
    participant2: "/images/couple-facemask.jpg",
    participant3: "/images/Girl2_generated.jpg",
    eventDescription: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt.`,
    completionDeadline: 13,
    part_number: 13,
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
  {
    id: 12,
    eventName: "Help Segun",
    eventImageName: "/images/help-a-friend.jpg",
    eventCreator: "James Brady",
    eventCategory: "academic_category",
    participant1: "/images/bearded_man.jpg",
    participant2: "/images/couple-facemask.jpg",
    participant3: "/images/Girl2_generated.jpg",
    eventDescription: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt.`,
    completionDeadline: 13,
    part_number: 15,
    location: "5, Chief Spectacular avenue, off Lagoa highway, Lagos",
  },
];

export const timezone = [
  {
    offset: "GMT-12:00",
    name: "Etc/GMT-12",
  },
  {
    offset: "GMT-11:00",
    name: "Etc/GMT-11",
  },
  {
    offset: "GMT-11:00",
    name: "Pacific/Midway",
  },
  {
    offset: "GMT-10:00",
    name: "America/Adak",
  },
  {
    offset: "GMT-09:00",
    name: "America/Anchorage",
  },
  {
    offset: "GMT-09:00",
    name: "Pacific/Gambier",
  },
  {
    offset: "GMT-08:00",
    name: "America/Dawson_Creek",
  },
  {
    offset: "GMT-08:00",
    name: "America/Ensenada",
  },
  {
    offset: "GMT-08:00",
    name: "America/Los_Angeles",
  },
  {
    offset: "GMT-07:00",
    name: "America/Chihuahua",
  },
  {
    offset: "GMT-07:00",
    name: "America/Denver",
  },
  {
    offset: "GMT-06:00",
    name: "America/Belize",
  },
  {
    offset: "GMT-06:00",
    name: "America/Cancun",
  },
  {
    offset: "GMT-06:00",
    name: "America/Chicago",
  },
  {
    offset: "GMT-06:00",
    name: "Chile/EasterIsland",
  },
  {
    offset: "GMT-05:00",
    name: "America/Bogota",
  },
  {
    offset: "GMT-05:00",
    name: "America/Havana",
  },
  {
    offset: "GMT-05:00",
    name: "America/New_York",
  },
  {
    offset: "GMT-04:30",
    name: "America/Caracas",
  },
  {
    offset: "GMT-04:00",
    name: "America/Campo_Grande",
  },
  {
    offset: "GMT-04:00",
    name: "America/Glace_Bay",
  },
  {
    offset: "GMT-04:00",
    name: "America/Goose_Bay",
  },
  {
    offset: "GMT-04:00",
    name: "America/Santiago",
  },
  {
    offset: "GMT-04:00",
    name: "America/La_Paz",
  },
  {
    offset: "GMT-03:00",
    name: "America/Argentina/Buenos_Aires",
  },
  {
    offset: "GMT-03:00",
    name: "America/Montevideo",
  },
  {
    offset: "GMT-03:00",
    name: "America/Araguaina",
  },
  {
    offset: "GMT-03:00",
    name: "America/Godthab",
  },
  {
    offset: "GMT-03:00",
    name: "America/Miquelon",
  },
  {
    offset: "GMT-03:00",
    name: "America/Sao_Paulo",
  },
  {
    offset: "GMT-03:30",
    name: "America/St_Johns",
  },
  {
    offset: "GMT-02:00",
    name: "America/Noronha",
  },
  {
    offset: "GMT-01:00",
    name: "Atlantic/Cape_Verde",
  },
  {
    offset: "GMT",
    name: "Europe/Belfast",
  },
  {
    offset: "GMT",
    name: "Africa/Abidjan",
  },
  {
    offset: "GMT",
    name: "Europe/Dublin",
  },
  {
    offset: "GMT",
    name: "Europe/Lisbon",
  },
  {
    offset: "GMT",
    name: "Europe/London",
  },
  {
    offset: "UTC",
    name: "UTC",
  },
  {
    offset: "GMT+01:00",
    name: "Africa/Algiers",
  },
  {
    offset: "GMT+01:00",
    name: "Africa/Windhoek",
  },
  {
    offset: "GMT+01:00",
    name: "Atlantic/Azores",
  },
  {
    offset: "GMT+01:00",
    name: "Atlantic/Stanley",
  },
  {
    offset: "GMT+01:00",
    name: "Europe/Amsterdam",
  },
  {
    offset: "GMT+01:00",
    name: "Europe/Belgrade",
  },
  {
    offset: "GMT+01:00",
    name: "Europe/Brussels",
  },
  {
    offset: "GMT+02:00",
    name: "Africa/Cairo",
  },
  {
    offset: "GMT+02:00",
    name: "Africa/Blantyre",
  },
  {
    offset: "GMT+02:00",
    name: "Asia/Beirut",
  },
  {
    offset: "GMT+02:00",
    name: "Asia/Damascus",
  },
  {
    offset: "GMT+02:00",
    name: "Asia/Gaza",
  },
  {
    offset: "GMT+02:00",
    name: "Asia/Jerusalem",
  },
  {
    offset: "GMT+03:00",
    name: "Africa/Addis_Ababa",
  },
  {
    offset: "GMT+03:00",
    name: "Asia/Riyadh89",
  },
  {
    offset: "GMT+03:00",
    name: "Europe/Minsk",
  },
  {
    offset: "GMT+03:30",
    name: "Asia/Tehran",
  },
  {
    offset: "GMT+04:00",
    name: "Asia/Dubai",
  },
  {
    offset: "GMT+04:00",
    name: "Asia/Yerevan",
  },
  {
    offset: "GMT+04:00",
    name: "Europe/Moscow",
  },
  {
    offset: "GMT+04:30",
    name: "Asia/Kabul",
  },
  {
    offset: "GMT+05:00",
    name: "Asia/Tashkent",
  },
  {
    offset: "GMT+05:30",
    name: "Asia/Kolkata",
  },
  {
    offset: "GMT+05:45",
    name: "Asia/Katmandu",
  },
  {
    offset: "GMT+06:00",
    name: "Asia/Dhaka",
  },
  {
    offset: "GMT+06:00",
    name: "Asia/Yekaterinburg",
  },
  {
    offset: "GMT+06:30",
    name: "Asia/Rangoon",
  },
  {
    offset: "GMT+07:00",
    name: "Asia/Bangkok",
  },
  {
    offset: "GMT+07:00",
    name: "Asia/Novosibirsk",
  },
  {
    offset: "GMT+08:00",
    name: "Etc/GMT+8",
  },
  {
    offset: "GMT+08:00",
    name: "Asia/Hong_Kong",
  },
  {
    offset: "GMT+08:00",
    name: "Asia/Krasnoyarsk",
  },
  {
    offset: "GMT+08:00",
    name: "Australia/Perth",
  },
  {
    offset: "GMT+08:45",
    name: "Australia/Eucla",
  },
  {
    offset: "GMT+09:00",
    name: "Asia/Irkutsk",
  },
  {
    offset: "GMT+09:00",
    name: "Asia/Seoul",
  },
  {
    offset: "GMT+09:00",
    name: "Asia/Tokyo",
  },
  {
    offset: "GMT+09:30",
    name: "Australia/Adelaide",
  },
  {
    offset: "GMT+09:30",
    name: "Australia/Darwin",
  },
  {
    offset: "GMT+09:30",
    name: "Pacific/Marquesas",
  },
  {
    offset: "GMT+10:00",
    name: "Etc/GMT+10",
  },
  {
    offset: "GMT+10:00",
    name: "Australia/Brisbane",
  },
  {
    offset: "GMT+10:00",
    name: "Australia/Hobart",
  },
  {
    offset: "GMT+10:00",
    name: "Asia/Yakutsk",
  },
  {
    offset: "GMT+10:30",
    name: "Australia/Lord_Howe",
  },
  {
    offset: "GMT+11:00",
    name: "Asia/Vladivostok",
  },
  {
    offset: "GMT+11:30",
    name: "Pacific/Norfolk",
  },
  {
    offset: "GMT+12:00",
    name: "Etc/GMT+12",
  },
  {
    offset: "GMT+12:00",
    name: "Asia/Anadyr",
  },
  {
    offset: "GMT+12:00",
    name: "Asia/Magadan",
  },
  {
    offset: "GMT+12:00",
    name: "Pacific/Auckland",
  },
  {
    offset: "GMT+12:45",
    name: "Pacific/Chatham",
  },
  {
    offset: "GMT+13:00",
    name: "Pacific/Tongatapu",
  },
  {
    offset: "GMT+14:00",
    name: "Pacific/Kiritimati",
  },
];

export const depositor_category_arrays = [
  { depositor: "Ezeani", date: "12/3/2022 2:30pm", amount: "20" },
  { depositor: "Boye", date: "1/3/2022 9:10pm", amount: "20" },
  { depositor: "Promise", date: "20/4/2022 4:65pm", amount: "20" },
  { depositor: "Emanuella", date: "14/2/2022 6:37pm", amount: "20" },
  { depositor: "Oyeyemi", date: "31/1/2022 8:32pm", amount: "20" },
];