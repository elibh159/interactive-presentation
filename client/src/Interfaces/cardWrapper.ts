export interface CardWrapperInterface {
  id: number;
  header: string;
  title: string;
  link: string;
  content: ContentValue[];
}

export interface ContentValue {
  id: number;
  text: string;
}
