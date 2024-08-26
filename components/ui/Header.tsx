import Divider from "./Divider";

export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-2xl lg:text-6xl font-semibold">
      {children}
      <Divider />
    </h1>
  );
}
