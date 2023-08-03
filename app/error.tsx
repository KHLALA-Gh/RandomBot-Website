"use client";

export default function Error(props: any) {
  console.log(props);
  return (
    <>
      <h1>{props.error.message}</h1>
    </>
  );
}
