"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditPrompt = () => {
  const [submiting, setSubmiting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const router = useRouter();

  useEffect(() => {
    const getPromptDetail = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (promptId) getPromptDetail();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmiting(true);
    if (!promptId) return alert("Prompt ID not found");
    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmiting(false);
    }
  };

  return (
    <Form
      type="Update"
      post={post}
      setPost={setPost}
      submiting={submiting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
