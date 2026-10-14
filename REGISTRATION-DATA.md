# College registration snapshot

The public roster uses only college names, submission counts, and member counts in `src/config/collegeRegistrations.json`. The source registration spreadsheet remains unchanged. Personal names, contact details, transaction IDs, and payment evidence are not bundled or committed.

The 13 October 2026 snapshot contains 87 submissions and 286 listed members across 33 normalized college names. Count each non-empty member-name field, excluding placeholders such as N/A, nil, none, and hyphens. Do not assume every entry contains the required three or four members. These are submitted entries, not verified payments or confirmed attendance.

College spelling and location variants are grouped: M Kumarasamy/Kumaraswamy, Nehru Institute of Technology, Mahendra Engineering College, Mahendra Institute of Technology, SSM Institute/Institution/SSMIET, Shree Venkateshwara Hi Tech, Dr NGP/N G P, and Selvam College of Technology. Distinct institutions such as K Ramakrishnan College of Engineering and College of Technology remain separate.

For the next update, re-read the private response sheet through an authorized connection, aggregate its non-empty member fields by normalized college, update only the aggregate JSON and its `updatedAt` date, and rebuild. Do not export the raw responses into the repository or fetch the private response sheet in the browser. The interface explicitly labels the data as a snapshot and does not claim automatic live synchronization.
