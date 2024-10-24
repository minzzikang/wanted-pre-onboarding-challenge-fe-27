import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
  message: string;
  token: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const emailRegEx =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const passwordRegEx = /^[a-zA-Z0-9!@#$%^&*]{8,}$/;

  const [isButtonEnabled, setIsButtonEnabled] = useState(false)

  useEffect(() => {
    const isEmailValid = emailRegEx.test(email)
    const isPasswordValid = passwordRegEx.test(password)
    setIsButtonEnabled(isEmailValid && isPasswordValid)
  }, [email, password])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const authData = { email, password };

    try {
      const res = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authData),
      });

      const data: LoginResponse = await res.json();
      console.log("로그인 성공");
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  // 토큰 존재 시 루트 경로로 이동
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <h3>로그인</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 입력"
            value={email}
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 입력"
            value={password}
          />
        </div>
        <button type="submit" disabled={!isButtonEnabled}>제출</button>
      </form>
    </>
  );
}
