interface FAQCategoryDetailsProps {
  data: {
    id: string
    name: string
    addedBy: string
    status: string
    orderType: string
  }
}

function FAQCategoryDetails({ data }: FAQCategoryDetailsProps) {
  return (
    <div className="mt-4">
      <p>
        <strong>ID:</strong> {data.id}
      </p>
      <p>
        <strong>Name:</strong> {data.name}
      </p>
      <p>
        <strong>Added By:</strong> {data.addedBy}
      </p>
      <p>
        <strong>Status:</strong> {data.status}
      </p>
      <p>
        <strong>Order Type:</strong> {data.orderType}
      </p>
    </div>
  )
}

export default FAQCategoryDetails
