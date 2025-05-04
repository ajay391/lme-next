import { useRouter } from 'next/router';

const TestPage = () => {
  const router = useRouter();
  const { slug } = router.query; // Access the slug from router.query

  console.log("TestPage slug:", slug); // Should log "hello" when visiting /test/hello

  if (!slug) return <div>Loading...</div>; // Handle cases where the slug is not yet available

  return <div>Slug: {slug}</div>;
};

export default TestPage;
