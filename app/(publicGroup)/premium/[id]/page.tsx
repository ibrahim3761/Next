import { NewsDetails } from "../../_components/news/NewsDetails";
import { getNewsById } from "../../_actions/getNewsById";
import { notFound } from "next/navigation";

const PremiumNewsByIdPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const result = await getNewsById(id, true);

  if (!result.success || !result.data) {
    return notFound();
  }

  return <NewsDetails post={result.data} />;
};

export default PremiumNewsByIdPage;