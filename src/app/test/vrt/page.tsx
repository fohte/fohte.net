export default function VRTTestPage() {
  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
        VRT Test Page
      </h1>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>Typography</h2>
        <p style={{ marginBottom: '12px' }}>
          This is a paragraph with some text content for visual regression
          testing.
        </p>
        <p style={{ color: '#666' }}>
          This is a secondary paragraph with different styling.
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>Buttons</h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Primary Button
          </button>
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: 'transparent',
              color: '#0070f3',
              border: '2px solid #0070f3',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Secondary Button
          </button>
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: '#ccc',
              color: '#666',
              border: 'none',
              borderRadius: '6px',
              cursor: 'not-allowed',
            }}
            disabled
          >
            Disabled Button
          </button>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>Cards</h2>
        <div
          style={{
            border: '1px solid #e1e4e8',
            borderRadius: '8px',
            padding: '20px',
            backgroundColor: '#f6f8fa',
          }}
        >
          <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
            Card Title
          </h3>
          <p style={{ color: '#586069', marginBottom: '12px' }}>
            This is a card component with some content inside.
          </p>
          <a href="#" style={{ color: '#0366d6', textDecoration: 'none' }}>
            Learn more →
          </a>
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>
          Form Elements
        </h2>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            maxWidth: '400px',
          }}
        >
          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '4px',
                fontWeight: '500',
              }}
            >
              Text Input
            </label>
            <input
              type="text"
              placeholder="Enter some text"
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
              }}
            />
          </div>
          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '4px',
                fontWeight: '500',
              }}
            >
              Select
            </label>
            <select
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
              }}
            >
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
          <div>
            <label
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <input type="checkbox" />
              <span>Checkbox option</span>
            </label>
          </div>
        </form>
      </section>
    </div>
  )
}
