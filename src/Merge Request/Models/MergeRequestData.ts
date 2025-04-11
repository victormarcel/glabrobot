export interface MergeRequestData {
    
    assignee_id: number;
    reviewer_ids: number[];
    source_branch: string;
    target_branch: string;
    title: string;
    description: string;
    labels: string[];
    milestone_id: number;
    remove_source_branch: boolean;
}