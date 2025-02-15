import BasicLayout from "../layouts/BasicLayout";
import React from "react";
import useCustomLogin from "../hooks/useCustomLogin";

const AboutPage = () => {
  const { isLogin, moveToLoginReturn } = useCustomLogin(); // 로그인 여부 확인 및 로그인 페이지로 이동
  if (!isLogin) {
    // 로그인하지 않은 경우 로그인 페이지로 이동
    return moveToLoginReturn();
  }

  return (
    <BasicLayout>
      <div className="text-3xl font-bold mb-4">About MATJIBGO</div>
      <div className="text-lg mb-4">
        <p className="font-bold">Find, Share, and Save the Best Eats!</p>
        <p>
          Matjibgo is your ultimate destination for discovering and bookmarking the best restaurants, cafés, and hidden food gems. Whether you're looking for a cozy brunch spot, a trendy new eatery, or a local favorite, Matjibgo helps you explore and keep track of your culinary adventures.
        </p>
        <p className="font-bold mt-4">What You Can Do with Matjibgo:</p>
        <ul className="list-disc list-inside ml-4">
          <li>🍽 <strong>Discover</strong> – Explore a curated collection of top-rated restaurants and hidden gems.</li>
          <li>📍 <strong>Share</strong> – Recommend your favorite spots and let others in on your best food finds.</li>
          <li>🔖 <strong>Save</strong> – Bookmark must-visit places so you never forget where to go next.</li>
          <li>⭐ <strong>Review</strong> – Share your thoughts and experiences with the community.</li>
        </ul>
        <p className="mt-4">
          Join us in creating a community of food lovers who appreciate great dining experiences. Whether you're a foodie, a traveler, or just looking for your next meal, Matjibgo makes it easy to find and remember the best places to eat.
        </p>
        <p className="font-bold mt-4">👉 Start exploring today and never miss out on a great meal again!</p>
      </div>
    </BasicLayout>
  );
};

export default AboutPage;
