export default function App() {
  return (
    <div className="font-geist">
      <div className="bg-background p-6 rounded-lg">
        This div uses the default background color
      </div>

      <div className="bg-card p-4 rounded-md">This div looks like a card</div>

      <button className="bg-primary text-primary-foreground px-4 py-2 rounded font-mozilla">
        Primary Button
      </button>
    </div>
  )
}
