import ParticlesComp from "@/components/ParticlesComp";
import styles2 from "../components/auth/auth.module.css";
const Event_Form = () => {
  return (
    <main className={styles2.container}>
      <div className={styles2.particles}>
        <ParticlesComp />
      </div>
    </main>
  );
};

export default Event_Form;
