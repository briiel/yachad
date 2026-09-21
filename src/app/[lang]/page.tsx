import { redirect } from 'next/navigation';

export default async function LangRootPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'he' ? 'he' : 'en';
  redirect(`/${lang}/videos`);
}
