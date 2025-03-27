import { redirect } from 'next/navigation';

export default function RootPage() {
  // Simply redirect to the English version
  redirect('/en');
}
