import { useState } from 'react';
import styles from './Inquiry.module.css';

type Errors = {
  name?:string;
  email?:string;
  message?:string;
}

export default function Inquiry() {
  const [formDate,setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting] = useState(false);
  const validate = () => {
    let newErrors:Errors  = {};

    if(!formDate.name) newErrors.name = 'お名前を入力してください';
    else if(formDate.name.length > 30) newErrors.name = 'お名前は30文字以内で入力してください';

    if(!formDate.email) newErrors.email = 'メールアドレスを入力してください';
    else if(!/\S+@\S+\.\S+/.test(formDate.email)) newErrors.email = '有効なメールアドレスを入力してください';

    if(!formDate.message) newErrors.message = '本文を入力してください';
    else if(formDate.message.length > 500) newErrors.message = '本文は500文字以内で入力してください';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(validate()){
      try {
        const response = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formDate)
      });

      if(response.ok){
      alert("送信しました");

      setFormData({ name:'', email:'', message:'' });
      setErrors({});
    }else{      
      alert("送信に失敗しました");
      return;
    }
    
  }catch (error) {
    console.error("Error:", error);
    alert("送信に失敗しました");
  }
}
};

  return (
    <form className={styles.formInquiry} onSubmit={handleSubmit}>
      <div className={styles.form}>問合わせフォーム</div>

      <div className={styles.formLabel}>
        <label>お名前</label>
        <div className={styles.inputArea}>
        <input type="text"
        disabled={isSubmitting}
        value={formDate.name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formDate, name: e.target.value})}
        />
        {errors.name && <span className={styles.newErrors}>{errors.name}</span>}
        </div>
      </div>

      <div className={styles.formLabel}>
        <label>メールアドレス</label>
        <div className={styles.inputArea}>
        <input type="email" 
        disabled={isSubmitting}
        value={formDate.email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formDate, email: e.target.value})}
        />
        {errors.email && <span className={styles.newErrors}>{errors.email}</span>}
        </div>
      </div>
        
        
      <div className={styles.formLabel}>
        <label>本文</label>
        <div className={styles.inputArea}>
        <textarea rows={4}
        disabled={isSubmitting}
        value={formDate.message}
        onChange={(e) => setFormData({...formDate, message: e.target.value})}
        />
        
        {errors.message && <span className={styles.newErrors}>{errors.message}</span>}
        </div>
      </div>

      <div className={styles.formButton}>
       <button 
       type="submit" 
       disabled={isSubmitting}
       className={styles.formSend}>{isSubmitting ? "送信中..." : "送信"}
       </button>
       <button type="reset" 
       disabled={isSubmitting}
       className={styles.formClear}
       onClick={() => {
        setFormData({ name:'', email:'', message:'' });
        setErrors({});
       }}
       >クリア
       </button>
      </div>
    </form>
  );
}