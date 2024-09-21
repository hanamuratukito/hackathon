type Props = {
  children: JSX.Element;
};

function Layout({ children }: Props) {
  return <div className="container mx-auto p-4 max-w-[640px]">{children}</div>;
}

export default Layout;
