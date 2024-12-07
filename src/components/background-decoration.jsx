export function BackgroundDecoration() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-0 left-0 w-32 h-32 bg-[url('/corner-decoration.png')] bg-contain bg-no-repeat opacity-30"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-[url('/corner-decoration.png')] bg-contain bg-no-repeat opacity-30 transform scale-x-[-1]"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[url('/corner-decoration.png')] bg-contain bg-no-repeat opacity-30 transform scale-y-[-1]"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-[url('/corner-decoration.png')] bg-contain bg-no-repeat opacity-30 transform scale-x-[-1] scale-y-[-1]"></div>
    </div>
  );
}
