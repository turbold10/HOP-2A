import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 50,
  duration: "30s",
};

const query = `
query GetTuitionsByAdmission($admissionId: Int!) {
  getTuitionsByAdmission(admissionId: $admissionId) {
    admissionId
    tenantId
    tags {
      id
      name
      tenantId
      color
      createdAt
      updatedAt
      __typename
    }
    id
    contract {
      totalAmount
      discounts {
        value
        name
        discountType
        __typename
      }
      grade
      id
      installments {
        percent
        amountDue
        dueDate
        installmentNumber
        __typename
      }
      previousContract {
        installments {
          percent
          amountDue
          dueDate
          installmentNumber
          __typename
        }
        totalAmount
        tuition {
          id
          bankTransactions {
            id
            tenantId
            contractId
            amount
            description
            bankAccountHolder
            bankAccountNumber
            paidAt
            __typename
          }
          __typename
        }
        discounts {
          value
          name
          discountType
          __typename
        }
        fee {
          feeType
          name
          value
          __typename
        }
        __typename
      }
      student {
        address
        age
        birthDate
        emergencyContact {
          relation
          firstName
          phoneNumber
          __typename
        }
        eduEmail
        familyName
        firstName
        gender
        lastName
        registerNumber
        profilePicture
        phone
        nationality
        __typename
      }
      fee {
        feeType
        name
        value
        __typename
      }
      __typename
    }
    gradeGroupStudent {
      id
      gradeGroup {
        teachers {
          id
          firstName
          lastName
          email
          phoneNumber
          department
          __typename
        }
        roomId
        name
        id
        gradeId
        gradeName
        __typename
      }
      __typename
    }
    bankTransactions {
      id
      tenantId
      contractId
      amount
      description
      bankAccountHolder
      bankAccountNumber
      paidAt
      __typename
    }
    notes {
      id
      user {
        lastName
        firstName
        profileImage
        __typename
      }
      text
      tuitionId
      createdAt
      updatedAt
      __typename
    }
    __typename
  }
}
`;

const headers = {
  "Content-Type": "application/json",
  authorization:
    "eyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDExMUFBQSIsImtpZCI6Imluc18ydEVna002ZDhVVFZORVhGZjlrbkxBaW02MVciLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwczovL3NlZWQtdHVpdGlvbi13ZWItdGVzdGluZy5wYWdlcy5kZXYiLCJleHAiOjE3NTAzMjgxNDIsImZ2YSI6WzQsLTFdLCJpYXQiOjE3NTAzMjgwODIsImlzcyI6Imh0dHBzOi8vdmVyaWZpZWQtbXVza3JhdC00NS5jbGVyay5hY2NvdW50cy5kZXYiLCJqdGkiOiJmODgwNWY2NTZmM2UwMjhjMDkyZCIsIm1ldGFkYXRhIjp7InJvbGUiOiJhZG1pbiIsInRlbmFudElkIjoib3JnXzJ4SjJHT3FYOGsxUmRnZXMxRUUzd0lVQkpvVyJ9LCJuYmYiOjE3NTAzMjgwNzIsInNpZCI6InNlc3NfMnlpcVkzSExMNjBUVWFiM2luaUtmd3pPbkZBIiwic3ViIjoidXNlcl8ydEtJZnZ2aXhnY3BOZkE4c1FoVnY5RzRnRUQifQ.DfxVDemU5VsLI6J7Kae30VHkF1eQjUwWuyYAQuKwo9Ey4MSRLSE8rqlJLEHdS1mwosyzDW2N8-UhNZE8MdA0mDsSBXSe5O5CM-9nFEh0P7Fzehef0ygA2IjXHlOKAvYfr2wnQbY08foR0mM6MhLeBFgBFXsheZh_QQDoUBZbbPYYZ-4rg5h5LKFQP9_wn-k4BQTseAIBN03CjpQsAJ5v_ZRZ38hzNCAuXjd4wJ6CRNpAnZPKzE2o2hG6mPcFx0-SlGjnqKgL8CRs1YGZVxrci0jFlvv4l6w-UIBXr8f7v_IPEJMBzeVImr-B1dIiEqOxTRMyh7nynrds4tTIDcBm-Q",
};

export default function () {
  const variables = {
    admissionId: 3,
  };
  // "https://seed-federation-test.shagai.workers.dev/graphql";
  // "https://seed-federation-testing.vercel.app/graphql",
  let res = http.post(
    "https://seed-federation-test.shagai.workers.dev/graphql",
    JSON.stringify({
      query: query,
      variables: variables,
    }),
    { headers: headers }
  );
  check(res, { "status is 200": (r) => r.status === 200 });
  sleep(2);
}
